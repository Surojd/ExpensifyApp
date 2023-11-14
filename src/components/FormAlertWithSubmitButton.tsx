import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import styles from '@styles/styles';
import Button from './Button';
import FormAlertWrapper from './FormAlertWrapper';

type FormAlertWithSubmitButtonProps = {
    /** Error message to display above button */
    message?: string;

    /** Whether the button is disabled */
    isDisabled?: boolean;

    /** Whether message is in html format */
    isMessageHtml?: boolean;

    /** Styles for container element */
    containerStyles?: StyleProp<ViewStyle>;

    /** Is the button in a loading state */
    isLoading?: boolean;

    /** Callback fired when the "fix the errors" link is pressed */
    onFixTheErrorsLinkPressed?: () => void;

    /** Should the button be enabled when offline */
    enabledWhenOffline?: boolean;

    /** Disable press on enter for submit button */
    disablePressOnEnter?: boolean;

    /** Whether the form submit action is dangerous */
    isSubmitActionDangerous?: boolean;

    /** Custom content to display in the footer after submit button */
    footerContent?: React.ReactNode;

    /** Styles for the button */
    buttonStyles?: StyleProp<ViewStyle>;

    /** Whether to show the alert text */
    isAlertVisible: boolean;

    /** Text for the button */
    buttonText: string;
};

function FormAlertWithSubmitButton({
    message = '',
    isDisabled = false,
    isMessageHtml = false,
    containerStyles = [],
    isLoading = false,
    onFixTheErrorsLinkPressed = () => {},
    enabledWhenOffline = false,
    disablePressOnEnter = false,
    isSubmitActionDangerous = false,
    footerContent = null,
    buttonStyles = [],
    buttonText,
    isAlertVisible,
}: FormAlertWithSubmitButtonProps) {
    const style = [!footerContent ? {} : styles.mb3, buttonStyles];

    return (
        <FormAlertWrapper
            containerStyles={[styles.mh5, styles.mb5, styles.justifyContentEnd, containerStyles]}
            isAlertVisible={isAlertVisible}
            isMessageHtml={isMessageHtml}
            message={message}
            onFixTheErrorsLinkPressed={onFixTheErrorsLinkPressed}
        >
            {(isOffline) => (
                <View>
                    {isOffline && !enabledWhenOffline ? (
                        <Button
                            success
                            isDisabled
                            text={buttonText}
                            style={style}
                            danger={isSubmitActionDangerous}
                        />
                    ) : (
                        <Button
                            success
                            pressOnEnter={!disablePressOnEnter}
                            text={buttonText}
                            style={style}
                            onPress={onSubmit}
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            danger={isSubmitActionDangerous}
                        />
                    )}
                    {footerContent}
                </View>
            )}
        </FormAlertWrapper>
    );
}

FormAlertWithSubmitButton.displayName = 'FormAlertWithSubmitButton';

export default FormAlertWithSubmitButton;
