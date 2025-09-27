import Field from "./components/Field/Field";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-900">
      {/* título no topo */}
      <h1 className="text-3xl text-center mt-8 text-white">Campo Minado</h1>

      {/* tabuleiro centralizado verticalmente abaixo do título */}
      <div className="flex-1 flex items-center justify-center w-full">
        <Field />
      </div>
    </div>
  );
}


export default App;
