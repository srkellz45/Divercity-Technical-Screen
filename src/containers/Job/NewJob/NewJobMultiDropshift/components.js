import glamorous from 'glamorous';

const Item = glamorous.div(
  {
    position: 'relative',
    cursor: 'pointer',
    display: 'block',
    border: 'none',
    height: 'auto',
    textAlign: 'left',
    borderTop: 'none',
    lineHeight: '1em',
    textTransform: 'none',
    boxShadow: 'none',
    padding: '.8rem 1.1rem',
    whiteSpace: 'normal',
    wordWrap: 'normal',
    fontFamily: "Avenir-Roman",
    fontSize: "18px",
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineGeight: "normal",
    letterSpacing: "normal",
    color: "#333241",
    zIndex: "1",
    backgroundColor: "white",
  },
  ({isActive, isSelected}) => {
    const styles = [];
    if (isActive) {
      styles.push({
        background: 'rgba(217,219,224)',
      });
    }
    if (isSelected) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        fontWeight: '700',
      });
    }
    return styles;
  },
)
const onAttention = '&:hover, &:focus';
const onFocus = '&:focus';
const Input = glamorous.input(
  {
    width: '100%', // full width - icon width/2 - border
    fontSize: '18px',
    wordWrap: 'break-word',
    lineHeight: '1em',
    outline: 0,
    whiteSpace: 'normal',
    minHeight: '2em',
    background: '#fff',
    display: 'inline-block',
    padding: '1em 2em 1em 1em',
    color: 'rgba(0,0,0,.87)',
    boxShadow: 'none',
    border: '1px solid rgba(34,36,38,.15)',
    borderRadius: '.30rem',
    [onFocus]: {
            outline: 'none',
          },
  },
  ({isOpen}) =>
    isOpen
      ? {
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
          [onAttention]: {
            boxShadow: 'none',
            outline: 'none',
          },
        }
      : null,
)

const Label = glamorous.label({
  fontWeight: 'bold',
  display: 'block',
  marginBottom: 10,
});

const InputValueWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  flex: '1 1 auto',
  fontSize: '15px',
  width: '550px',
  minHeight: '48px',
  borderRadius: '5px',
  border: 'none',
  fontFamily: "Avenir-Roman",
  padding: '5px 10px 5px 10px',
      [onFocus]: {
            outline: 'none',
          },
});

const Menu = glamorous.div({
  maxHeight: '300px',
  overflowY: 'auto',
  overflowX: 'hidden',
  borderTopWidth: '0',
  outline: '0',
  borderRadius: '6px',
  backgroundColor: '#ffffff',
});

const ControllerButton = glamorous.button({
  backgroundColor: 'transparent',
  border: 'none',
  position: 'absolute',
  right: 0,
  top: 0,
  cursor: 'pointer',
  width: 47,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 'none'
});


export { Menu, ControllerButton, Input, Item, Label, InputValueWrapper};
