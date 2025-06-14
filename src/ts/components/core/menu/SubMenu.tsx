import { Box, Menu  } from "@mantine/core";
import { __PopoverProps } from "props/popover";
import { StylesApiProps } from "props/styles";
import React from "react";
import { getLoadingState, getChildLayout } from "../../../utils/dash3";

interface Props extends __PopoverProps, StylesApiProps {
    variant?: string;
    /** Menu content */
    children?: React.ReactNode;
    /** Controlled menu opened state */
    opened?: boolean;
    /** Uncontrolled menu initial opened state */
    defaultOpened?: boolean;
    /** Determines whether dropdown should trap focus of keyboard events */
    trapFocus?: boolean;
    /** Determines whether Menu should be closed when item is clicked */
    closeOnItemClick?: boolean;
    /** Determines whether arrow key presses should loop though items (first to last and last to first) */
    loop?: boolean;
    /** Determines whether dropdown should be closed when Escape key is pressed */
    closeOnEscape?: boolean;
    /** Event which should open menu */
    trigger?: "click" | "hover" | "click-hover";
    /** Open delay in ms, applicable only to trigger="hover" variant */
    openDelay?: number;
    /** Close delay in ms, applicable only to trigger="hover" variant */
    closeDelay?: number;
    /** Determines whether dropdown should be closed on outside clicks */
    closeOnClickOutside?: boolean;
    /** Events that trigger outside clicks */
    clickOutsideEvents?: string[];
    /** Set the `tabindex` on all menu items. Defaults to -1 */
    menuItemTabIndex?: -1 | 0;
    /** Unique ID to identify this component in Dash callbacks. */
    id?: string;
    /** Update props to trigger callbacks. */
    setProps: (props: Record<string, any>) => void;
}

/** Sub Menu */
const SubMenu = (props: Props) => {
    const { children, setProps, ...others } = props;

    return (
        <Menu.Sub {...others}>
            {React.Children.map(children, (child: any, index) => {
                const { type: childType, props: childProps } = getChildLayout(child);
                if (childType === "SubMenuTarget") {
                    const { boxWrapperProps } = childProps;
                    return (
                        <Menu.Sub.Target key={index}>
                            <Box {...boxWrapperProps}>
                                {child}
                            </Box>
                        </Menu.Sub.Target>
                    );
                }
                return child;
            })}
        </Menu.Sub>
    );
};

export default SubMenu;
