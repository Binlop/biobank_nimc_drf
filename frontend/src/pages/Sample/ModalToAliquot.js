import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

export default class ModalToPregnancy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aliquot: this.props.aliquot,
      samplePlaces: [], // Состояние для списка мест хранения
    };
  }

  // Получение списка мест хранения из API
  componentDidMount() {
    this.refreshSamplePlaces();
  }

  refreshSamplePlaces() {
    fetch(`/api/storage/sample_map/${this.state.aliquot.sample.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ samplePlaces: data });
      })
      .catch((error) => {
        console.error("Ошибка при получении списка мест хранения:", error);
      });
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const aliquot = { ...this.state.aliquot, [name]: value };

    this.setState({ aliquot });
  };

  render() {
    const { toggle, onSave } = this.props;
    const { aliquot, samplePlaces } = this.state; // Получаем состояния из this.state

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Беременность</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Название</Label>
              <Input
                type="text"
                name="name"
                value={aliquot.name}
                onChange={this.handleChange}
                placeholder="Название"
              />
            </FormGroup>
            <FormGroup>
              <Label>Место хранения</Label>
              <Input
                type="select"
                name="location"
                value={aliquot.location}
                onChange={this.handleChange} // Обработчик изменения для select
              >
                {samplePlaces.map((place) => (
                  <option key={place.id} value={place.id}>
                    {place.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Количество</Label>
              <Input
                type="text"
                name="volume"
                value={aliquot.volume}
                onChange={this.handleChange}
                placeholder="Название"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(aliquot)}>
            Изменить
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
