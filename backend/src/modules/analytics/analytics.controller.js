const analyticsService =
require("./analytics.service");

const escapeCsv = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  const text = String(value);

  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
};

const reportRows = (report) => [
  ["Metric", "Value"],
  ["Project", report.project.name],
  ["Total tasks", report.overview.totalTasks],
  ["Completed tasks", report.overview.completedTasks],
  ["Active tasks", report.overview.activeTasks],
  ["Progress", `${report.overview.progress}%`],
  ["Productivity", `${report.overview.productivity}%`],
  ["Overdue tasks", report.overview.overdueTasks],
  [
    "Estimated hours",
    report.timeTracking.estimatedHours,
  ],
  ["Actual hours", report.timeTracking.actualHours],
  [
    "Time variance",
    report.timeTracking.varianceHours,
  ],
  [
    "AI recommendations",
    report.aiRecommendations.join(" "),
  ],
];

const buildCsv = (report) =>
  [
    ...reportRows(report),
    [],
    ["Status", "Tasks"],
    ...Object.entries(report.statusBreakdown),
    [],
    ["Member", "Assigned", "Completed", "Active", "Estimated Hours", "Actual Hours"],
    ...report.workload.map((member) => [
      member.name,
      member.assigned,
      member.completed,
      member.active,
      member.estimatedHours,
      member.actualHours,
    ]),
    [],
    ["Date", "Completed Tasks"],
    ...report.completionTrend.map((item) => [
      item.date,
      item.completed,
    ]),
  ]
    .map((row) => row.map(escapeCsv).join(","))
    .join("\n");

const buildExcel = (report) => {
  const rows = [
    ...reportRows(report),
    ["", ""],
    ["Status", "Tasks"],
    ...Object.entries(report.statusBreakdown),
    ["", ""],
    [
      "Member",
      "Assigned",
      "Completed",
      "Active",
      "Estimated Hours",
      "Actual Hours",
    ],
    ...report.workload.map((member) => [
      member.name,
      member.assigned,
      member.completed,
      member.active,
      member.estimatedHours,
      member.actualHours,
    ]),
  ];

  return `<!doctype html><html><head><meta charset="utf-8" /></head><body><table>${rows
    .map(
      (row) =>
        `<tr>${row
          .map(
            (cell) =>
              `<td>${String(cell ?? "").replace(
                /[&<>]/g,
                (char) =>
                  ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                  }[char])
              )}</td>`
          )
          .join("")}</tr>`
    )
    .join("")}</table></body></html>`;
};

const escapePdfText = (value) =>
  String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

const buildPdf = (report) => {
  const lines = [
    `Project Analytics Report: ${report.project.name}`,
    `Generated: ${new Date(report.generatedAt).toLocaleString()}`,
    `Progress: ${report.overview.progress}%`,
    `Tasks: ${report.overview.completedTasks}/${report.overview.totalTasks} completed`,
    `Productivity: ${report.overview.productivity}%`,
    `Overdue tasks: ${report.overview.overdueTasks}`,
    `Time: ${report.timeTracking.actualHours}/${report.timeTracking.estimatedHours} hours`,
    "",
    "AI Recommendations:",
    ...report.aiRecommendations.map(
      (item) => `- ${item}`
    ),
    "",
    "Workload:",
    ...report.workload.map(
      (member) =>
        `- ${member.name}: ${member.active} active, ${member.completed} completed`
    ),
  ].slice(0, 34);

  const content = [
    "BT",
    "/F1 14 Tf",
    "50 760 Td",
    ...lines.flatMap((line, index) => [
      index === 0
        ? `(${escapePdfText(line)}) Tj`
        : `0 -20 Td (${escapePdfText(line)}) Tj`,
    ]),
    "ET",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(pdf, "utf8");
};

const getFilters = (query) => ({
  startDate: query.startDate,
  endDate: query.endDate,
  status: query.status,
  priority: query.priority,
  memberId: query.memberId,
});

exports.getProjectReport = async (req, res) => {
  const report = await analyticsService.getProjectReport(
    req.params.projectId,
    getFilters(req.query)
  );

  res.status(200).json({
    success: true,
    data: report,
  });
};

exports.exportProjectReport = async (req, res) => {
  const report = await analyticsService.getProjectReport(
    req.params.projectId,
    getFilters(req.query)
  );

  const format = req.params.format;
  const fileBase = `${report.project.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}-analytics`;

  if (format === "csv") {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileBase}.csv"`
    );
    return res.send(buildCsv(report));
  }

  if (format === "excel") {
    res.setHeader(
      "Content-Type",
      "application/vnd.ms-excel"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileBase}.xls"`
    );
    return res.send(buildExcel(report));
  }

  if (format === "pdf") {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileBase}.pdf"`
    );
    return res.send(buildPdf(report));
  }

  return res.status(400).json({
    success: false,
    message: "Unsupported export format",
  });
};

exports.getTaskStatus =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getTaskStatusAnalytics(
        req.user._id
      ),

  });

};

exports.getPriority =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getPriorityAnalytics(
        req.user._id
      ),

  });

};

exports.getProjects =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getProjectAnalytics(),

  });

};

exports.getMonthlyActivity =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getMonthlyActivity(
        req.user._id
      ),

  });

};

exports.getTopContributors =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getTopContributors(),

  });

};

exports.getDashboardAnalytics =
async (req, res) => {

  res.status(200).json({

    success: true,

    data:
      await analyticsService.getDashboardAnalytics(
        req.user._id
      ),

  });

};
