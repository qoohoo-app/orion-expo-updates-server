import React from 'react'

function Background ({ children }) {
  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: "#191C1F",
  }

  return <div style={backgroundStyle}>{children}</div>
}

export { Background }
