import ThemeToggle from "./components/common/ThemeToggle";

export default function App() {
    return (
        <div
            className="
            min-h-screen
            flex
            flex-col
            items-center
            justify-center
            transition-all
            duration-300
            "
        >
            <h1 className="text-5xl font-bold mb-8">
                TaskFlow AI
            </h1>

            <ThemeToggle />
        </div>
    );
}