import UserController from '../../../controllers/UserController.ts';
import Block from '../../../utils/Block.ts';
import { Button } from '../../button/index.ts';
import { Input } from '../../input/index.ts';
import template from './load_file.hbs';

interface LoadFileProps {
  loadingFileStatus?: string;
}

export class LoadFile extends Block<LoadFileProps> {
  constructor(props: LoadFileProps) {
    super({
      ...props,
      loadingFileStatus: 'Load new avatar',
    });
  }

  init() {
    this.children.input = new Input({
      name: 'custom-input',
      type: 'file',
      accept: 'image/*',
    });

    this.children.button = new Button({
      label: 'Change avatar',
      class: 'btn btn-dark',
      events: {
        click: () => {
          this.onSubmit();
          const modal = document.querySelector('.load-files-outer');
          modal?.classList.toggle('active');
        },
      },
    });
  }

  onSubmit() {
    const fileInput = this.children.input as Input;
    const file = fileInput.getFile();

    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      UserController.uploadAvatar(formData);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
