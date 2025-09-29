import Game from "./components/Game";

function App() {
    return (
        <div className="h-screen w-screen flex flex-col bg-zinc-900 text-white">
            <h1
                className="
        mt-5 text-center text-5xl font-black uppercase tracking-widest
        text-transparent bg-clip-text
        bg-gradient-to-b from-indigo-300 to-slate-600
        drop-shadow-md title-font
    "
            >
                Campo Minado
            </h1>

            <div className="flex-1 flex items-center justify-center">
                <Game />
            </div>
        </div>
    );
}

export default App;
