export default function SettingsCard({
    title,
    children
}) {
    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6">

            <h2 className="mb-6 text-xl font-semibold">
                {title}
            </h2>

            {children}

        </div>
    );
}