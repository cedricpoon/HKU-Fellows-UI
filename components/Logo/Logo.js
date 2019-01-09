import React, { PureComponent } from 'react';
import Svg,{ Path, G, Line, Polyline, Ellipse } from 'react-native-svg';
import PropTypes from 'prop-types';

class Logo extends PureComponent {
  render() {
    const { size, ...restProps } = this.props;

    return (
      <Svg width={size} height={size} viewBox="0 0 500 512" {...restProps}>
        <Path fill="#4BBFB3" d="M475.866,365.865C491.338,332.573,500,295.323,500,256C500,114.615,388.071,0,250,0S0,114.615,0,256
          s111.929,256,250,256c32.332,0,63.229-6.285,91.593-17.727L475.866,365.865z"/>
        <Path fill="#248477" d="M432.7,366.322c-57.858,11.609-96.37,67.233-88.879,126.269l131.787-126.269
          C461.841,363.534,447.324,363.388,432.7,366.322z"/>
        <G>
          <Line fill="none" stroke="#FFFFFF" strokeWidth="7.68" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="15.36,15.36" x1="119.352" y1="242.474" x2="118.936" y2="354.543"/>
          <Ellipse fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="5.12" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="118.936" cy="342.021" rx="8.606" ry="8.813"/>
          <Path fill="none" stroke="#FFFFFF" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
            M408.691,219.362L250,157.457L91.309,219.362c0,0,158.188,58.81,159.195,59.841c0.288,0.295,13.314-4.46,31.774-11.401
            l-0.048,0.019l38.3,19.637v-34.175C362.855,237.113,408.691,219.362,408.691,219.362z"/>
          <Polyline fill="none" stroke="#FFFFFF" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="
            154.281,247.733 154.281,299.118 252.078,337.293 345.719,300.15 345.719,247.733 	"/>
        </G>
      </Svg>
    );
  }
}

Logo.propTypes = {
  size: PropTypes.number.isRequired
}

export default Logo;
