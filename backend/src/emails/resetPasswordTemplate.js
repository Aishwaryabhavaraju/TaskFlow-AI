const resetPasswordTemplate = (name, resetURL) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
      <h2>TaskFlow AI</h2>

      <p>Hello <strong>${name}</strong>,</p>

      <p>You requested to reset your password.</p>

      <p>
        Click the button below to reset it.
      </p>

      <a
        href="${resetURL}"
        style="
          background:#2563eb;
          color:white;
          padding:12px 20px;
          text-decoration:none;
          border-radius:5px;
          display:inline-block;
        "
      >
        Reset Password
      </a>

      <p style="margin-top:25px;">
        This link expires in <strong>15 minutes</strong>.
      </p>

      <p>
        If you didn't request this,
        simply ignore this email.
      </p>

      <hr>

      <small>TaskFlow AI Team</small>

    </div>
  `;
};

module.exports = resetPasswordTemplate;