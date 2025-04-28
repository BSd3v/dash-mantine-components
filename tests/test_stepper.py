from dash import Dash, html, Output, Input, State, _dash_renderer, clientside_callback, ALL
import dash_mantine_components as dmc

_dash_renderer._set_react_version("18.2.0")


def test_001st_stepper(dash_duo):
    app = Dash(__name__)

    app.layout = dmc.MantineProvider(
        html.Div(
            [
                dmc.Stepper(
                    id="stepper",
                    active=0,
                    children=[
                        dmc.StepperStep(children="Step 1", label="Step 1"),
                        dmc.StepperStep(children="Step 2", label="Step 2"),
                        dmc.StepperStep(children="Step 3", label="Step 3"),
                    ],
                ),
                dmc.Group(
                    [
                        dmc.Button("Previous", id="previous-button"),
                        dmc.Button("Next", id="next-button"),
                    ]
                ),
                html.Div(id="output"),
            ]
        )
    )

    clientside_callback(
        """(n, active) => n ? Math.max(active - 1, 0) : active""",
        Output("stepper", "active", allow_duplicate=True),
        Input("previous-button", "n_clicks"),
        State("stepper", "active"),
        prevent_initial_call=True,
    )

    clientside_callback(
        """(n, active) => n ? Math.min(active + 1, 2) : active""",
        Output("stepper", "active", allow_duplicate=True),
        Input("next-button", "n_clicks"),
        State("stepper", "active"),
        prevent_initial_call=True,
    )

    dash_duo.start_server(app)

    # Wait for the app to load
    dash_duo.wait_for_text_to_equal("div.mantine-Stepper-content", "Step 1")

    step_buttons = dash_duo.find_elements("button.mantine-Stepper-step")

    for i, btn in enumerate(step_buttons):
        btn.click()
        dash_duo.wait_for_text_to_equal("div.mantine-Stepper-content", f"Step {i + 1}")

    dash_duo.find_element("#previous-button").click()
    dash_duo.wait_for_text_to_equal("div.mantine-Stepper-content", "Step 2")

    dash_duo.find_element("#next-button").click()
    dash_duo.wait_for_text_to_equal("div.mantine-Stepper-content", "Step 3")

    assert dash_duo.get_logs() == []

def test_002st_stepper(dash_duo):
    app = Dash(
        __name__,
    )

    app.layout = \
        dmc.MantineProvider(
            dmc.Stack(
                dmc.Stepper(
                    [
                        dmc.StepperStep(id={'type': 'stepper-step', 'index': 0}, label="Dataset",
                                        description="Select a Dataset"),
                        dmc.StepperStep(id={'type': 'stepper-step', 'index': 1}, label="Embedding",
                                        description="Select an embedding method"),
                        dmc.StepperStep(id={'type': 'stepper-step', 'index': 2}, label="Query Strategy",
                                        description="Select a Query Strategy"),
                        dmc.StepperStep(id={'type': 'stepper-step', 'index': 3}, label="Model",
                                        description="Select a model"),
                    ],
                    id='stepper',
                    active=1,
                    orientation='vertical',
                ),
                align="center"
            )
        )

    @app.callback(
        Input('stepper', 'active'),
        output=dict(
            descriptions=Output({'type': 'stepper-step', 'index': ALL}, 'description'),
        ),
        prevent_initial_call=True
    )
    def on_step_change(
            step,
    ):
        updated_descriptions = [str(step)] * 4
        return dict(
            descriptions=updated_descriptions,
        )

    dash_duo.start_server(app)

    # Wait for the app to load
    dash_duo.wait_for_text_to_equal(".mantine-Stepper-stepDescription", "Select a Dataset")

    step_buttons = dash_duo.find_elements("button.mantine-Stepper-step")

    for i, btn in enumerate(step_buttons):
        btn.click()
        dash_duo.wait_for_text_to_equal(".mantine-Stepper-stepDescription", f"{i}")

    assert dash_duo.get_logs() == []