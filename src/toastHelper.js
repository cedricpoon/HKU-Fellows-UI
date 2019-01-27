import { Toast } from 'native-base';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

const show = ({ message, type, duration, hideButton, bottom }) => {
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

export const show1s = ({ message, type }) => {
  show({ message, type, duration: 1000, bottom: 40, hideButton: true });
}
