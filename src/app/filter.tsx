import styles from "./filter.module.css"
import { useState } from "react"

type SelectOption = {
    label: string
    value: string
}

type SelectChoice = {
    options: SelectOption[]
    value?: SelectOption | undefined
    onChange: (value: SelectOption | undefined ) => void
}

export function Select({ value, onChange, options}: SelectChoice) {
const [isOpen, setIsOpen] = useState(false) /* to open/close the option list */

function clearOptions() {
    onChange(undefined) /*call onChange and pass in undefined to clear the value*/
}

function selectOption(option: SelectOption) {
    onChange(option) /*call onChange and pass in the option*/
}

function isOptionSelected(option: SelectOption) {
    return option === value /*returns true if option is equal to value*/
}

    return (
        /*gets previous value and gives opposite of it, so if it's true it will set to false and vice versa*/
        <div onClick = {() => setIsOpen(prev => !prev)} tabIndex={0} className={styles.container}>
            <span className={styles.value}>{value?.label}</span>
            <button onClick={e => {
                clearOptions()
            }} className={styles["clear-btn"]}>
                x
            </button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div> 
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}> 
                {options.map((option) => (
                    <li onClick={e => {
                        selectOption(option)
                        setIsOpen(true) /*to close after choosing option*/
                    }} className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""}`}>{option.label}</li>
                    /*calls isOptionSelected to style the currently selected option; if our option is selected then our style will be rendered, 
                    otherwise an empty string will be rendered*/
                ))}
            </ul>
        </div>
    )
}