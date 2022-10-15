import React from 'react'

const ToggleLightDark = () => {

    const [theme, setTheme] = React.useState('light')

    // const toggleThemeMode = () => {
    //     div.classList.toggle(theme);
    // };

  return (
    <div>
        <label class="switch">
            <input type="checkbox" id="toggle" onChange={toggleThemeMode} />
            <span class="slider"></span>
        </label>
    </div>
  )
}

export default ToggleLightDark