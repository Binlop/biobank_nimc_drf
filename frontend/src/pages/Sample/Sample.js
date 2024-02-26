import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SampleList from './SampleList';
import DNACreate from './DNA/DNACreate';


export default function Sample() {
    return (
      <main className="container">
        <Routes>
          <Route path="/" element={<SampleList />} />

          <Route path="/dna/create" element={<DNACreate />} />

          {/* <Route path="/embryo/:id" element={<EmbryoDetail />} />
          <Route path="/embryo/:id/update" element={<EmbryoUpdate />} /> */}

        </Routes>
      </main>
  );
}