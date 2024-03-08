import React from 'react';
import CharFieldWithError from "../../../components/Fields/CharFieldWithError";
import CheckMarkWithError from "../../../components/Fields/CheckMarkWithError";
import DatePicker from "react-datepicker";


const EmbryoFilterForm = ({ embryoData, handleChangeEmbryo, handleChangeDateOfReceipt, handleChangeDateLastMenstruation, errors, toggleEmbryo, 
    handleChangeEmbryoCheckMark, isOpenEmbryo }) => {
    return (
        <div className="collapsible" onClick={toggleEmbryo}>
        {"Пробанд"}
        <br />
        {isOpenEmbryo && (          
          <div onClick={(event) => event.stopPropagation()}>
            <CharFieldWithError
              label="Название"
              name="name"
              value={embryoData.name}
              onChange={handleChangeEmbryo}
              errors={errors}
            />
            <CheckMarkWithError
            label="Кровь:"
            name="count_blood"
            value={embryoData.count_blood || false}            
            onChange={handleChangeEmbryoCheckMark}
            errors={errors}  
          />
            <CheckMarkWithError
            label="ДНК:"
            name="count_dna"
            value={embryoData.count_dna}
            onChange={handleChangeEmbryoCheckMark}
            errors={errors}  
          />
            <CheckMarkWithError
            label="Хорион:"
            name="count_chorion"
            value={embryoData.count_chorion}
            onChange={handleChangeEmbryoCheckMark}
            errors={errors}  
          />
          <CharFieldWithError
              label="ID абортуса"
              name="abortus_id"
              value={embryoData.abortus_id}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="ID абортуса в семье"
              name="abortus_id_in_family"
              value={embryoData.abortus_id_in_family}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <div className="form-group">
            <label htmlFor="date_of_receipt">Дата получения:</label>
            <DatePicker selected={embryoData.date_of_receipt} dateFormat="yyyy/MM/dd" onChange={handleChangeDateOfReceipt} />
            {errors && errors.date_of_receipt &&
            <div className="alert alert-danger mt-3 mb-0">{errors.date_of_receipt}</div>
            }
          </div>
          <div className="form-group">
            <label htmlFor="diagnosis">Диагноз:</label>
            <select id="diagnosis" name="diagnosis" value={embryoData.diagnosis} onChange={handleChangeEmbryo} className="form-control">
            <option value="noth">---------------------</option>
            <option value="none">Нет данных</option>
            <option value="spontaneous_abortion">Спонтанный аборт</option>
            <option value="blighted_ovum">Неразвивающаяся беременность</option>
            <option value="anembryonia">Анэмбриония</option>
            <option value="fetal_development_abnormalities">Пороки развития плода</option>
            </select>
            {errors && errors.diagnosis &&
            <div className="alert alert-danger mt-3 mb-0">{errors.diagnosis}</div>
            }
          </div>
          <div className="form-group">
          <label htmlFor="last_menstruation">Дата последней менструации:</label>
          <DatePicker selected={embryoData.last_menstruation} dateFormat="yyyy/MM/dd" onChange={handleChangeDateLastMenstruation} className="form-control mr-sm-2"/>
          {errors && errors.last_menstruation &&
          <div className="alert alert-danger mt-3 mb-0">{errors.last_menstruation}</div>
          }
          </div>
          <CharFieldWithError
              label="Срок беременности по дате"
              name="period_pregnancy_by_date"
              value={embryoData.period_pregnancy_by_date}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Срок беременности по УЗИ"
              name="period_pregnancy_by_USI"
              value={embryoData.period_pregnancy_by_USI}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
        <div className="form-group">
          <label htmlFor="diagnosis">Зачатие:</label>
          <select id="conception" name="conception" value={embryoData.conception} onChange={handleChangeEmbryo} className="form-control">
          <option value="noth">---------------------</option>
          <option value="none">Нет данных</option>
          <option value="natural">Естественное</option>
          <option value="ivf">ЭКО</option>
          <option value="icsi">ИКСИ</option>
          <option value="pgd">ПГД</option>
          <option value="donor_egg">Донорская яйцеклетка</option>
          <option value="donor_sperm">Донорские сперматозоиды</option>
          <option value="other">Другое</option>
          </select>
          {errors && errors.diagnosis &&
          <div className="alert alert-danger mt-3 mb-0">{errors.diagnosis}</div>
          }
          </div>
          <CheckMarkWithError
            label="Близнецы:"
            name="twins"
            value={embryoData.twins}
            onChange={handleChangeEmbryoCheckMark}
            errors={errors}  
          />
          <CharFieldWithError
              label="Размеры 1 плодного мешка по x"
              name="dimensions_fetal_sac_x_1"
              value={embryoData.dimensions_fetal_sac_x_1}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Размеры 1 плодного мешка по y"
              name="dimensions_fetal_sac_y_1"
              value={embryoData.dimensions_fetal_sac_y_1}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Размеры 2 плодного мешка по x"
              name="dimensions_fetal_sac_x_2"
              value={embryoData.dimensions_fetal_sac_x_2}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Размеры 2 плодного мешка по y"
              name="dimensions_fetal_sac_y_2"
              value={embryoData.dimensions_fetal_sac_y_2}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Копчико-теменной размер плода (КТР)"
              name="ktr"
              value={embryoData.ktr}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Особенности эмбриона"
              name="features_embryo"
              value={embryoData.features_embryo}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Особенности хориона"
              name="features_chorion"
              value={embryoData.features_chorion}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Особенности желточного мешка"
              name="features_yolk_sac"
              value={embryoData.features_yolk_sac}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Особенности амниотической оболочки"
              name="features_amniotic_membrane"
              value={embryoData.features_amniotic_membrane}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Примечание"
              name="note"
              value={embryoData.note}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Вероятный кариотип"
              name="karyotype"
              value={embryoData.karyotype}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <div className="form-group">
            <label htmlFor="karyotype_type">Кариотип:</label>
            <select id="karyotype_type" name="karyotype_type" value={embryoData.karyotype_type} onChange={handleChangeEmbryo} className="form-control">
              <option value="none">---------------------</option>
              <option value="46,XX">46,XX</option>
              <option value="46,XY">46,XY</option>
              <option value="45,X">45,X</option>
              <option value="sex_chromosome_trisomy">Трисомия по половым хромосомам</option>
              <option value="autosome_trisomy">Трисомия аутосом</option>
              <option value="mosaic_autosome_trisomy">Трисомия аутосом MOS с нормальным клоном</option>
              <option value="double_trisomy">Двойная трисомия</option>
              <option value="triploidy">Триплоидия</option>
            </select>
            {errors && errors.karyotype_type &&
            <div className="alert alert-danger mt-3 mb-0">{errors.karyotype_type}</div>
            }
          </div>
          <CharFieldWithError
              label="Сверхчисленная хромосома"
              name="supernumerary_chromosome"
              value={embryoData.supernumerary_chromosome}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CheckMarkWithError
            label="Мозаицизм"
            name="mosaicism"
            value={embryoData.mosaicism}
            onChange={handleChangeEmbryoCheckMark}
            errors={errors}  
          />
          <CharFieldWithError
              label="Стандартный кариотип"
              name="standard_karyotype"
              value={embryoData.standard_karyotype}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="aCGH кариотип"
              name="aCGH_karyotype"
              value={embryoData.aCGH_karyotype}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="CNV"
              name="CNV"
              value={embryoData.CNV}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="FISH"
              name="FISH"
              value={embryoData.FISH}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CheckMarkWithError
            label="FISH мозаицизм"
            name="FISH_mosaicism"
            value={embryoData.FISH_mosaicism}
            onChange={handleChangeEmbryoCheckMark}
            errors={errors}  
          />
          <CharFieldWithError
              label="CGH"
              name="CGH"
              value={embryoData.CGH}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="STR"
              name="STR"
              value={embryoData.STR}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="SRY"
              name="SRY"
              value={embryoData.SRY}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="RT_PCR"
              name="RT_PCR"
              value={embryoData.RT_PCR}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="Метилирование"
              name="methylation"
              value={embryoData.methylation}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <CharFieldWithError
              label="LINE"
              name="LINE"
              value={embryoData.LINE}
              onChange={handleChangeEmbryo}
              errors={errors}
          />
          <div className="form-group">
            <label>Конфликт между различными методами:</label>
            <input
            type="checkbox"
            name="сonflict_between_different_methods"
            onChange={handleChangeEmbryo}
            className="form-control mr-sm-2"
            />
            {errors && errors.сonflict_between_different_methods &&
            <div className="alert alert-danger mt-3 mb-0">{errors.сonflict_between_different_methods}</div>
            }
          </div>  
          </div>
        )}
        </div>    
    );
};

export default EmbryoFilterForm;