import { Route, Routes } from 'react-router-dom';
import SampleList from './SampleList';
import SampleDetail from './SampleDetail';
import SampleCreate from './SampleCreate';
import SampleUpdate from './SampleUpdate';


export default function Sample() {
    return (
      <main className="container">

        <Routes>
          <Route path="/" element={<SampleList />} />

          <Route path="/dna/:id/" element={<SampleDetail />} />
          <Route path="/dna/create/" element={<SampleCreate page_title="Добавить ДНК" apiPath="/api/sample/dna/create/"/>} />
          <Route path="/dna/:id/update/" element={<SampleUpdate page_title="Изменить ДНК"/>} />

          <Route path="/chorion/:id/" element={<SampleDetail />} />
          <Route path="/chorion/create/" element={<SampleCreate page_title="Добавить хорион" apiPath="/api/sample/chorion/create/" />} />
          <Route path="/chorion/:id/update/" element={<SampleUpdate page_title="Изменить хорион" />} />

          <Route path="/blood/:id/" element={<SampleDetail />} />
          <Route path="/blood/create/" element={<SampleCreate page_title="Добавить кровь" apiPath="/api/sample/blood/create/" />} />
          <Route path="/blood/:id/update/" element={<SampleUpdate page_title="Изменить кровь" />} />

          <Route path="/endometrium/:id/" element={<SampleDetail />} />
          <Route path="/endometrium/create/" element={<SampleCreate page_title="Добавить эндометрий" apiPath="/api/sample/endometrium/create/" />} />
          <Route path="/endometrium/:id/update/" element={<SampleUpdate page_title="Изменить эндометрий" />} />


          <Route path="/fetal_sac_nitrogen/:id/" element={<SampleDetail />} />
          <Route path="/fetal_sac_nitrogen/create/" element={<SampleCreate page_title="Добавить плодный мешок(азот)" apiPath="/api/sample/fetal_sac_nitrogen/create/" />} />
          <Route path="/fetal_sac_nitrogen/:id/update/" element={<SampleUpdate page_title="Изменить плодный мешок(азот)" />} />


          <Route path="/fetal_sac_freezer/:id/" element={<SampleDetail />} />
          <Route path="/fetal_sac_freezer/create/" element={<SampleCreate page_title="Добавить плодный мешок(-80)" apiPath="/api/sample/fetal_sac_freezer/create/" />} />
          <Route path="/fetal_sac_freezer/:id/update/" element={<SampleUpdate page_title="Изменить плодный мешок(-80)" />} />
          
          {/* <Route path="/aliquot/:id/" element={<SampleDetail />} />
          <Route path="/aliquot/create/" element={<SampleCreate page_title="Добавить аликвоту" apiPath="/api/sample/aliquot/create/" />} />
          <Route path="/aliquot/:id/update/" element={<SampleUpdate page_title="Изменить плодный мешок(-80)" />} /> */}

        </Routes>

      </main>
  );
}