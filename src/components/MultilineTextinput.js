import React, {PropTypes, PureComponent} from 'react';
import {TextInput} from 'react-native';
import debounce from 'debounce';

/**
 * This is a workaround for the buggy react-native TextInput multiline on Android.
 *
 * Can be removed once https://github.com/facebook/react-native/issues/12717
 * is fixed.
 *
 * Example for usage:
 *   <MultilineTextInput value={this.state.text} onChangeText={text => setState({text})} />
 */
export default class MultilineTextInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selection: { 
        start: 0, 
        end: 0
      },

      allow_keyboard: true,
      allow_scroll_code: true
    };

    this.allowKeyboardTimeout = null;
    
    // Prevent 2 newlines for some Android versions, because they dispatch onSubmitEditing twice
    this.onSubmitEditing = debounce(this.onSubmitEditing.bind(this), 100, true);

    this.onMultilineScroll = this.onMultilineScroll.bind(this);
    this.onMultilineFocus = this.onMultilineFocus.bind(this);
    this.onMultilineBlur = this.onMultilineBlur.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      allow_keyboard: false,
      allow_scroll_code: false
    });

    if (this.allowKeyboardTimeout) {
      clearTimeout(this.allowKeyboardTimeout);
    }
  }


  onSubmitEditing() {
    const {selection} = this.state;
    const {value} = this.props;
    const newText = `${value.slice(0, selection.start)}\n${value.slice(selection.end)}`;
    // move cursor only for this case, because in other cases a change of the selection is not allowed by Android
    if (selection.start !== this.props.value.length && selection.start === selection.end) {
      this.setState({
        selection: {
          start: selection.start + 1,
          end: selection.end + 1,
        },
      });
    }
    this.props.onChangeText(newText);
  }

  onMultilineScroll() {
    if (this.state.allow_scroll_code) {
      if (this.allowKeyboardTimeout) {
        clearTimeout(this.allowKeyboardTimeout);
        this.allowKeyboardTimeout = null;
      }

      this.setState({allow_keyboard: false});
      this.allowKeyboardTimeout = setTimeout(() => this.setState({ allow_keyboard: true }), 500);
    }
  }

  onMultilineFocus() {
    this.setState({ allow_scroll_code: false });
  }

  onMultilineBlur() {
    this.setState({ allow_scroll_code: true });
  }

  render() {
    return (
      <TextInput
        multiline
        editable={ this.state.allow_keyboard }
        blurOnSubmit={false}
        selection={this.state.selection}
        value={this.props.value}
        onSelectionChange={event => this.setState({selection: event.nativeEvent.selection})}
        onChangeText={this.props.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
        onScroll={ this.onMultilineScroll }
        onFocus={ this.onMultilineFocus }
        onBlur={ this.onMultilineBlur }
        {...this.props}
      />
    );
  }
}

MultilineTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};
