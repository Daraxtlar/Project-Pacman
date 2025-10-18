import React from "react";

const Header = () =>{

    const styles = {
        container: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 100,
            padding: 10,
            backgroundColor: "blue",
            color: "orange",
            fontFamily: "Arial, sans-serif",
            fontSize: 30,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0
        },
        sideBox: {
            width: "20%",
            textAlign: "left",
            backgroundColor: "black",
            color: "white",
            paddingLeft: 5,
        },
        centerBox: {
            width: "60%",
            textAlign: "center",
            fontSize: 60,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px"
        },
        rightBox: {
            width: "20%",
            textAlign: "left",
            backgroundColor: "black",
            color: "white",
            paddingLeft: 5,
        },
        pacman: {
            width: "100px",
            height: "100px",
            backgroundColor: "yellow",
            borderRadius: "50%",
            position: "relative",
        },
        pacmanEye: {
            width: "16px",
            height: "16px",
            backgroundColor: "black",
            borderRadius: "50%",
            position: "absolute",
            top: "22px",
            left: "22px"
        },
        pacmanMouth: {
            width: "50px",
            height: "50px",
            backgroundColor: "blue",
            position: "absolute",
            top: "24px",
            right: 0,
            clipPath: "polygon(10% 60%, 110% -20%, 130% 120%)"
        },
        pacmanText: {
            fontSize: "60px",
            fontWeight: "bold",
            color: "orange",
            fontFamily: "Arial, sans-serif"
        }
    }

    return(
        <div style={styles.container}>
            <div style={styles.sideBox}>
                Score: 0 <br />
                Lives: 3
            </div>
            <div style={styles.centerBox}>
                <div style={styles.pacman}>
                    <div style={styles.pacmanEye}></div>
                    <div style={styles.pacmanMouth}></div>
                </div>
                <span style={styles.pacmanText}>PACMAN</span>
            </div>
            <div style={styles.rightBox}>
                Player:<br />
                <span style={{display: "block", textAlign: "center"}}>_username_</span>
            </div>
        </div>
    )

}

export default Header;