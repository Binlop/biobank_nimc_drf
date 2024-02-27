import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SampleList from './SampleList';
import DNACreate from './DNA/DNACreate';
import DNADetail from './DNA/DNADetail';
import DNAUpdate from './DNA/DNAUpdate';

export default function Sample() {
    return (
      <main className="container">
        <Routes>
          <Route path="/" element={<SampleList />} />

          <Route path="/dna/create/" element={<DNACreate />} />
          <Route path="/dna/:id/" element={<DNADetail />} />
          <Route path="/dna/:id/update/" element={<DNAUpdate />} />


        </Routes>
      </main>
  );
}