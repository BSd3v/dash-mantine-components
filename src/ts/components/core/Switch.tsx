import {
    MantineColor,
    MantineRadius,
    MantineSize,
    Switch as MantineSwitch,
} from "@mantine/core";
import { BoxProps } from "props/box";
import { DashBaseProps, PersistenceProps } from "props/dash";
import { StylesApiProps } from "props/styles";
import React from "react";
import { setPersistence } from "../../utils/dash3";

interface Props
    extends BoxProps,
        StylesApiProps,
        DashBaseProps,
        PersistenceProps {
    /** Content of the `label` associated with the radio */
    label?: React.ReactNode;
    /** Inner label when the `Switch` is in unchecked state */
    offLabel?: React.ReactNode;
    /** Inner label when the `Switch` is in checked state */
    onLabel?: React.ReactNode;
    /** Key of `theme.colors` or any valid CSS color to set input color in checked state, `theme.primaryColor` by default */
    color?: MantineColor;
    /** Controls size of all elements */
    size?: MantineSize | (string & {});
    /** Key of `theme.radius` or any valid CSS value to set `border-radius,` "xl" by default */
    radius?: MantineRadius;
    /** Props passed down to the root element */
    wrapperProps?: Record<string, any>;
    /** Icon inside the thumb of the switch */
    thumbIcon?: React.ReactNode;
    /** Position of the label relative to the input, `'right'` by default */
    labelPosition?: "left" | "right";
    /** Description displayed below the label */
    description?: React.ReactNode;
    /** Error displayed below the label */
    error?: React.ReactNode;
    /** A checkbox can show it is currently unable to be interacted with */
    disabled?: boolean;
    /** State of check box */
    checked?: boolean;
    /** dashRenderType */
    dashRenderType?: any;
}

/** Switch */
const Switch = (props: Props) => {
    const {
        setProps,
        loading_state,
        persistence,
        persisted_props,
        persistence_type,
        dashRenderType,
        onLabel,
        offLabel,
        ...others
    } = props;

    const updateProps = (checked: boolean) => {
        setProps({ checked, onLabel, offLabel });
    };

    return (
        <MantineSwitch
            onChange={(ev) => updateProps(ev.currentTarget.checked)}
            onLabel={onLabel}
            offLabel={offLabel}
            {...others}
        />
    );
};

setPersistence(Switch, ["checked"])

Switch.dashRenderType = true

export default Switch;
