import {PropTypes} from "prop-types";
import Counter from "./Counter";

export default function CounterButton({by, incrementMethod, decrementMethod}) {
    return (
        <div className="Counter">
            <div>
                <button className="counterButton"
                        onClick={() => decrementMethod(by)}
                >-{by}</button>
                <button className="counterButton"
                        onClick={() => incrementMethod(by)}
                >+{by}</button>
            </div>
        </div>
    )
}

Counter.propTypes = {
    by: PropTypes.number
}