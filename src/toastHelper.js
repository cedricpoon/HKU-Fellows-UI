import { Toast } from 'native-base';
import { localize } from 'hkufui/locale';
import { gridBase } from 'hkufui/theme/grid';

const locale = localize({ language: 'en', country: 'hk' });

export const show = ({ message, type, duration, hideButton, bottom }) => {
  Toast.show({
    text: message,
    buttonText: locale['toast.dismiss'],
    type,
    duration,
    style: bottom ? { bottom: bottom } : null,
    buttonStyle: hideButton ? { display: 'none' } : null
  });
}

export const show3s = ({ message, type }) => {
  show({ message, type, duration: 3000 });
}

export const show2s = ({ message, type }) => {
  show({ message, type, duration: 2000, bottom: gridBase * 11 });
}

export const show1s = ({ message, type }) => {
  show({ message, type, duration: 1000, bottom: gridBase * 11, hideButton: true });
}
