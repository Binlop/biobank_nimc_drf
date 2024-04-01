import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class ModalToPregnancy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pregnancy: this.props.pregnancy,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    const pregnancy = { ...this.state.pregnancy, [name]: value };
    this.setState({ pregnancy });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Беременность</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="laboratory-name">Название</Label>
              <Input
                type="text"
                name="pregnancy_year"
                value={this.state.pregnancy.pregnancy_year}
                onChange={this.handleChange}
                placeholder="Год беременности"
              />
            </FormGroup>
            <FormGroup>
            <Label for="exampleSelect">
            Select
            </Label>
            <Input
                name="diagnosis"
                type="select"
                value={this.state.pregnancy.diagnosis}
                onChange={this.handleChange}
            >
              <option value="noth">---------------------</option>
              <option value="none">Нет данных</option>
              <option value="spontaneous_abortion">Спонтанный аборт</option>
              <option value="blighted_ovum">Неразвивающаяся беременность</option>
              <option value="anembryonia">Анэмбриония</option>
              <option value="fetal_development_abnormalities">Пороки развития плода</option>
              <option value="medical_abortion">Медицинский аборт</option>
              <option value="ectopic_pregnancy">Внематочная беременность</option>
              <option value="stillbirth">Мертворожденный ребенок</option>
              <option value="live_birth">Живорожденный ребенок</option>
              <option value="child_with_developmental_defects">Ребенок с пороками развития</option>
              <option value="child_with_delayed_development">Ребенок с задержкой психо-речевого развития</option>
                </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.pregnancy)}
          >
            Сохранить
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}