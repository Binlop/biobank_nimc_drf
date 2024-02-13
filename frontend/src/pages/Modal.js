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

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    // if (e.target.type === "checkbox") {
    //   value = e.target.checked;
    // }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="laboratory-name">Название</Label>
              <Input
                type="text"
                id="laboratory-name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Введите название лаборатории"
              />
            </FormGroup>
            <FormGroup>
              <Label for="laboratory-description">Описание</Label>
              <Input
                type="text"
                id="laboratory-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Введите описание лаборатории"
              />
            </FormGroup>
            <FormGroup>
              <Label for="laboratory-admin">Админ</Label>
              <Input
                type="text"
                id="laboratory-admin"
                name="admin"
                value={this.state.activeItem.admin}
                onChange={this.handleChange}
                placeholder="Введите заведующего лабораторией"
              />
            </FormGroup>
            {/* <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup> */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Сохранить
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}