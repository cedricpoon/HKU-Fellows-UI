import { Toast } from 'native-base';
import { localize } from 'hkufui/locale';

const locale = localize({ language: 'en', country: 'hk' });

const show = ({ message, type, duration, hideButton, position }) => {
  Toast.show({
    text: message,
    buttonText: locale['toast.dismiss'],
    type,
    duration,
    position,
    buttonStyle: hideButton ? { display: 'none' } : null
  });
}

export const show3s = ({ message, type }) => {
  show({ message, type, duration: 3000 });
}

export const show2s = ({ message, type }) => {
  show({ message, type, duration: 2000, hideButton: true });
}
