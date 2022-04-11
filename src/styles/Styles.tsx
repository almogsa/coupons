import styled from 'styled-components'

export const Styles = styled.div`
    background: lavender;
    padding: 20px;
    height: 100%;
    overflow: scroll;

    h1 {
        border-bottom: 1px solid white;
        color: #3d3d3d;
        font-family: sans-serif;
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        padding: 10px;
        text-align: center;
    }

    form {
        background: white;
        border: 1px solid #dedede;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 0 auto;
        max-width: 500px;
        padding: 10px 30px;
    }

    input,
    select {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 5px;
        width: 100%;
    }

    label {
        color: #3d3d3d;
        display: block;
        font-family: sans-serif;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 5px;
        height: 20px;
    }

    .error {
        color: red;
        font-family: sans-serif;
        font-size: 12px;
        height: 15px;
    }

    .submitButton {
        background-color: #6976d9;
        color: white;
        font-family: sans-serif;
        font-size: 14px;
        margin: 20px 0px;
    }
`
