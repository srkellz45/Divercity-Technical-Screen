import React, { Component } from 'react';
import { Div } from 'glamorous';
import { css } from 'glamor';
import Downshift from 'downshift';
import AutosizeInput from 'react-input-autosize';
import {
  Menu,
  ControllerButton,
  Item,
  InputValueWrapper,

} from './components';
import TagValue from './TagValue';

const inputBoxCss = css({
  border: 'none',
  outline: 'none',
  cursor: 'inherit',
  fontSize: '14px',
});
function ArrowIcon({isOpen}) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? 'rotate(270)' : null}
      style={{border:'none'}}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  )
}
class MultiDownshift extends Component {
    constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      defaultValue: 'e.g. Accountant'
    };
    this.handleStateChange = this.handleStateChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onTagBlur = this.onTagBlur.bind(this);
    this.onRemoveTag = this.onRemoveTag.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.popValue = this.popValue.bind(this);
    this.onWrapperClick = this.onWrapperClick.bind(this);
    this.focusOnInput = this.focusOnInput.bind(this);
    this.inputRef = this.inputRef.bind(this);
    this.inputWrapperRef = this.inputWrapperRef.bind(this);
  }

  handleStateChange(changes, downshiftStateAndHelpers) {
    if (!downshiftStateAndHelpers.isOpen) {
      this.setState({
        inputValue: '',
        defaultValue: ''
      });
    }

    if (this.props.onChangedState) {
      this.props.onChangedState(changes, downshiftStateAndHelpers);
    }
  }

  onInputChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  onTagBlur(e, item) {
    const { onItemChanged } = this.props;
    if (onItemChanged) {
      onItemChanged(item);
    }
  }

  onRemoveTag(item) {
    this.props.onRemoveItem(item);
  }

  onInputKeyDown(evt) {
    console.log(evt.keyCode);
    const currentValue = evt.target.value;
    switch (evt.keyCode) {
      case 8: // backspace
        if (!currentValue) {
          evt.preventDefault();
          this.popValue();
        }
        return;
      case 9: // tab
        if (this.state.inputValue) {
          this.props.onUserInput(this.state.inputValue);
          this.setState({ inputValue: '', defaultValue: '' });
        }
        evt.preventDefault();
        evt.stopPropagation();
        return;
      case 13: // enter
        if (this.state.inputValue) {
          this.props.onUserInput(this.state.inputValue);
          this.setState({ inputValue: '', defaultValue: '' });
        }
        evt.preventDefault();
        evt.stopPropagation();
        return;
      case 46: // backspace
        if (!this.state.inputValue && this.props.deleteRemoves) {
          evt.preventDefault();
          this.popValue();
        }
        return;
      case 188: // comma
        if (!this.state.inputValue) {
          evt.preventDefault();
        } else {
          this.props.onUserInput(this.state.inputValue);
          this.setState({ inputValue: '', defaultValue: '' });
        }
        break;
      default: return;
    }

  }

  popValue() {
    const { selectedItem, onRemoveItem } = this.props;
    if (onRemoveItem) {
      onRemoveItem({ value: selectedItem[selectedItem.length - 1], index: selectedItem.length - 1 });
    }
  }

  onWrapperClick (evt){
    if (this._inputWrapper === evt.target || this._input === evt.target) {
      this.focusOnInput();
      evt.stopPropagation();
      evt.preventDefault();
    }
  }

  focusOnInput() {
    this._input.focus();
    if (typeof this._input.getInput === 'function') {
      this._input.getInput().focus();
    }
  }

  inputRef (c){
    this._input = c;
  }

  inputWrapperRef(c) {
    this._inputWrapper = c;
  }

  render() {
    const { itemToString, items, ...rest } = this.props;
    return (
      <Downshift
        onStateChange={this.handleStateChange}
        itemToString={itemToString}

        {...rest}>
        {({
          getLabelProps,
          getInputProps,
          getToggleButtonProps,
          getItemProps,
          isOpen,
          toggleMenu,
          clearSelection,
          selectedItem,
          highlightedIndex,
        }) => {
          let _inputProps = getInputProps({
              value: this.state.inputValue,
              ref: this.inputRef,
              inputClassName: inputBoxCss.toString(),
              onChange: this.onInputChange,
              onKeyDown: this.onInputKeyDown,
              placeholder: this.state.defaultValue
            });

          const tagItems = selectedItem.map((item, index) => {
            return { value: item, index };
          });

          return (
            <div className={css({ width: '354px', margin: 'auto',
              marginBottom: '0px', marginTop: '0px', borderRadius: "5px", border: "1px solid #cacaca"})}>
              <Div position="relative" className="Job_Item">
                <InputValueWrapper innerRef={this.inputWrapperRef} onClick={this.onWrapperClick} tabIndex="-1">
                  {tagItems.map(tag => (
                    <TagValue key={`Tag-${tag.index}`} onBlur={this.onTagBlur} onRemove={this.onRemoveTag} tag={tag} />
                  ))}
                  <AutosizeInput {..._inputProps} />
                </InputValueWrapper>
                <ControllerButton {...getToggleButtonProps() }>
                  <ArrowIcon isOpen={isOpen} />
                </ControllerButton>
              </Div>
              { !isOpen ? null : (
                <Menu>
                  {items.map((item, index) => (
                    <Item
                      key={`item-${index}`}
                      {...getItemProps({
                        item,
                        index,
                        isActive: highlightedIndex === index,
                        isSelected: selectedItem === item,
                      }) }
                    >
                      {item}
                    </Item>
                  ))}
                </Menu>
              )}
            </div>
          );
        }}
      </Downshift>
    )
  }
}

export default MultiDownshift;