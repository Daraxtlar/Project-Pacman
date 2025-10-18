import React from "react";

const Footer = () => {
    const styles = {
        footer: {
            backgroundColor: "blue",
            textAlign: "center",
            fontSize: 24,
            width: "100vw",

            position: "fixed",
            bottom: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }
    }



    return(
        <div style={styles.footer}>
            Grupa: Alicja Nawój, Aleksandra Bałut, Damian Kołpa, Łukasz Kruczek, Piotr Magiera
        </div>
    )
}

export default Footer;