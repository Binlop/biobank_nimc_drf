import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SampleList from './SampleList';
import SampleDetail from './SampleDetail';
import SampleCreate from './SampleCreate';
import SampleUpdate from './SampleUpdate';

import DNACreate from './DNA/DNACreate';
import DNADetail from './DNA/DNADetail';
import DNAUpdate from './DNA/DNAUpdate';


export default function Sample() {
    return (
      <main className="container">
        <Routes>
          <Route path="/" element={<SampleList />} />

          <Route path="/dna/create/" element={<DNACreate />} />
          <Route path="/dna/:id/" element={<SampleDetail />} />
          <Route path="/dna/:id/update/" element={<DNAUpdate />} />

          <Route path="/chorion/:id/" element={<SampleDetail />} />
          <Route path="/chorion/create/" element={<SampleCreate page_title="Добавить хорион" apiPath="/api/individ/chorion/create/" />} />
          <Route path="/chorion/:id/update/" element={<SampleCreate page_title="Изменить хорион" />} />

          <Route path="/blood/:id/" element={<SampleDetail />} />
          <Route path="/blood/create/" element={<SampleCreate page_title="Добавить кровь" apiPath="/api/individ/blood/create/" />} />
          <Route path="/blood/:id/update/" element={<SampleUpdate page_title="Изменить кровь" />} />

          <Route path="/endometrium/:id/" element={<SampleDetail />} />
          <Route path="/endometrium/create/" element={<SampleCreate page_title="Добавить эндометрий" apiPath="/api/individ/endometrium/create/" />} />
          <Route path="/endometrium/:id/update/" element={<SampleUpdate page_title="Изменить эндометрий" />} />


          <Route path="/fetal_sac_nitrogen/:id/" element={<SampleDetail />} />
          <Route path="/fetal_sac_nitrogen/create/" element={<SampleCreate page_title="Добавить плодный мешок(азот)" apiPath="/api/individ/fetal_sac_nitrogen/create/" />} />
          <Route path="/fetal_sac_nitrogen/:id/update/" element={<SampleUpdate page_title="Изменить плодный мешок(азот)" />} />


          <Route path="/fetal_sac_freezer/:id/" element={<SampleDetail />} />
          <Route path="/fetal_sac_freezer/create/" element={<SampleCreate page_title="Добавить плодный мешок(-80)" apiPath="/api/individ/fetal_sac_freezer/create/" />} />
          <Route path="/fetal_sac_freezer/:id/update/" element={<SampleUpdate page_title="Изменить плодный мешок(-80)" />} />

          <Route path="/aliquot/:id/" element={<SampleDetail />} />
          <Route path="/aliquot/create/" element={<SampleCreate page_title="Добавить аликвоту" apiPath="/api/individ/aliquot/create/" />} />
          <Route path="/aliquot/:id/update/" element={<SampleUpdate page_title="Изменить аликвоту" />} />

        </Routes>
      </main>
  );
}