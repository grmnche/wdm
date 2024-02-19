import Block from "../../../utils/Block.ts";
import template from "./file_attacher.hbs";

export class FileAttacher extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
