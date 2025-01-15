import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/insert" element={<Insert />} />
        <Route path="/select/:id" element={<Select />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
