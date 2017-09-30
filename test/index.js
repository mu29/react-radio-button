import PropTypes from 'prop-types';
import React from 'react';
import * as sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { RadioGroup, RadioButton, RadioIcon } from '../index.jsx';

describe('<RadioGroup /> component', () => {
    const onChangeSpy = sinon.spy();

    const props = {
        horizontal: false,
        value: null,
        onChange: onChangeSpy
    };

    const buttons = [
        { value: 'red' },
        { value: 'blue' },
        { value: 'green' }
    ];

    const children = buttons.map(button => {
        return <RadioButton {...button}>{button.value}</RadioButton>;
    });

    it('should render a parent div', () => {
        const radioGroup = shallow(<RadioGroup {...props}>{children}</RadioGroup>);
        expect(radioGroup.find('div').length).toBe(1);
    });

    it('should render a group of 3 radio buttons when given 3 children of <RadioButton>', () => {
        const radioGroup = mount(<RadioGroup {...props}>{children}</RadioGroup>);
        expect(radioGroup.find('RadioGroup').length).toBe(1);
        expect(radioGroup.find('RadioButton').length).toBe(3);
    });

    it('should render a list horizontally when given the prop horizontal: true', () => {
        const horizontalProps = Object.assign({}, props, { horizontal: true });
        const radioGroup = shallow(<RadioGroup {...horizontalProps}>{children}</RadioGroup>);
        const { style } = radioGroup.find('div').props();

        expect(style.display).toBe('inline-flex');
        expect(style.width).toBe('100%');
    });

    it('should fire the onChange callback with the correct with the value as an arg when a child is clicked', () => {
        const radioGroup = mount(<RadioGroup {...props}>{children}</RadioGroup>);
        const buttonIdx = 2;
        const secondButton = radioGroup.find('RadioButton').at(buttonIdx);

        secondButton.simulate('click');

        expect(onChangeSpy.calledOnce).toBe(true);
        expect(onChangeSpy.calledWith(buttons[buttonIdx].value)).toBe(true);
    });

    it('should update state.checkedIndex to the correct value when a child is clicked', () => {
        const radioGroup = mount(<RadioGroup {...props}>{children}</RadioGroup>);
        const buttonIdx = 1;
        const secondButton = radioGroup.find('RadioButton').at(buttonIdx);

        secondButton.simulate('click');
        expect(radioGroup.state('checkedIndex')).toEqual(buttonIdx);
    });
});

describe('<RadioButton /> component', () => {
    const onClickSpy = sinon.spy();
    const props = {
        value: 'some-value',
        onChange: onClickSpy
    };

    it('should render a three divs - 1 parent and two children', () => {
        const radioButton = shallow(<RadioButton {...props} />);

        expect(radioButton.find('div').length).toBe(3);
        expect(radioButton.find('div > div').length).toBe(2);
    });

    it('should render a selected styled (color changes) button given the prop checked: true', () => {
        const pointColor = 'FF0000';
        const checked = true;
        const checkedProps = Object.assign({}, props, { pointColor, checked });
        const radioButton = shallow(<RadioButton {...checkedProps} />);
        const { style } = radioButton.props();

        expect(style.color).toEqual(pointColor);
        expect(style.borderColor).toEqual(pointColor);
    });

    it('should render a disabled styled button when given the prop disabled: true', () => {
        const disabledProps = Object.assign({}, props, { disabled: true });
        const radioButton = shallow(<RadioButton {...disabledProps} />);
        const { style } = radioButton.props();

        expect(style.cursor).toBe('not-allowed');
        expect(style.color).toEqual('#e1e1e1');
    });

    it('should NOT fire the onChange callback when the disabled: true prop is given', () => {
        const disabledProps = Object.assign({}, props, { disabled: true });
        const radioButton = shallow(<RadioButton {...disabledProps} />);

        radioButton.simulate('click');
        expect(onClickSpy.calledOnce).toBe(false);
    });

    it('should fire the onChange callback when clicked', () => {
        const radioButton = shallow(<RadioButton {...props} />);

        radioButton.simulate('click');
        expect(onClickSpy.calledOnce).toBe(true);
    });

});

describe('<RadioIcon /> component', () => {
    const props = {
        checked: false,
        innerSize: 15,
        size: 30,
        pointColor: '#FF0000'
    };

    it('should render a div', () => {
        const radioIcon = shallow(<RadioIcon {...props} />);

        expect(radioIcon.find('div').length).toBe(1);
    });

    it('should render an inner div with correct style when checked: true', () => {
        const radioIcon = shallow(<RadioIcon {...props} />);

        expect(radioIcon.find('div').length).toBe(1);
        expect(radioIcon.find('div > div').length).toBe(0);

        radioIcon.setProps({ checked: true });
        radioIcon.update();

        expect(radioIcon.find('div > div').length).toBe(1);
        expect(radioIcon.find('div > div').props().style.height).toEqual(props.innerSize);
        expect(radioIcon.find('div > div').props().style.background).toEqual(props.pointColor);
    });
});
