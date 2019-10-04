import React from 'react';
import AutosizeInput from 'react-input-autosize';
import glamorous, { Div } from 'glamorous';
import { css } from 'glamor';
import x from '../../assets/X.png';

const XButton = glamorous.span({
  cursor: 'pointer'
})

const inputBoxCss = css({
  border: 'none',
  outline: 'none',
  cursor: 'inherit',
  fontSize: '14px'
});

class TagValue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      value: props.tag.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tag !== this.props.tag) {
      this.setState({ value: nextProps.tag.value });
    }
  }

  onDoubleClick = () => {
    this.setState({ editing: true });
  }

  onBlur = (e) => {
    const { onBlur, tag } = this.props;
    this.setState({ editing: false });
    if (onBlur) {
      onBlur(e, { ...tag, value: this.state.value });
    }
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  onRemove = (e) => {
    const { onRemove, tag } = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove({ ...tag, value: this.state.value });
    }
  }

  inputRef = (c) => {
    this._input = c;
  }

  render() {
    const { value, editing } = this.state;

    const inputProps = {
      type: 'text',
      value,
      ref: this.inputRef,
      inputClassName: inputBoxCss.toString(),
      onChange: this.onChange,
      onBlur: this.onBlur
    };

    return editing ? (
      <AutosizeInput {...inputProps} />
    ) : (
        <Div marginRight={4} backgroundColor="#ccc" onDoubleClick={this.onDoubleClick}>
        {value}{' '}
        <XButton onClick={this.onRemove}>
          <img src={ x } alt="remove" style={{height:"13px", width:"13px", marginBottom:"-2px", marginLeft: "5px"}} />
        </XButton>
      </Div>
    )
  }
}

export default TagValue;