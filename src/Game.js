import React, { useState } from 'react';



function pegarEstadoInicial(){
    const state = {};
    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            state[`${r}-${c}`] = null;
        }
    }
    return state;
}
const pegarChaveDaIndex= (index) =>{
    const linhaOK = Math.floor(index / 3);
    const colunaOK = index % 3;
    return `${linhaOK}-${colunaOK}`;
};
const getLabel = (value) => {
    if(!value){
        return null;
    }
    return value > 0 ? 'O' : 'X';
}

function PegarVencedor(v){
    for(let l = 0; l < 3; l++){
        for(let c = 0; c < 3; c++){
            const linha = 
            v[`${l}-${c}`] + 
            v[`${l}-${c+1}`] + 
            v[`${l}-${c+2}`];
            if(linha ===3 || linha === -3){
                return linha;
            }
            const coluna = 
            v[`${l}-${c}`] + 
            v[`${l +1}-${c}`] + 
            v[`${l +2}-${c}`];
            if(coluna ===3 || coluna === -3){
                return coluna;
            }
            const Diagonal = 
            v[`${l}-${c}`] + 
            v[`${l + 1}-${c + 1}`] + 
            v[`${l + 2}-${c + 2}`];
            if(Diagonal ===3 || Diagonal === -3){
                return Diagonal;
            }
            const outraDiagonal = 
            v[`${l}-${c}`] + 
            v[`${l + 1}-${c - 1}`] + 
            v[`${l + 2}-${c - 2}`];
            if(outraDiagonal ===3 || outraDiagonal === -3){
                return outraDiagonal;
            }
        }
    }
    return null;
}


const Game = () => {
    const [values, setValues] = useState(pegarEstadoInicial)
    const [jogador, setJogador] = useState(1);
    const [vencedor, setVencedor] = useState(null);

    function handleClick(key){
        if(vencedor || values[key]) {
            return;
        }
        const newValues = {
                ...values,
                [key]: jogador,
            };
        setValues(newValues)
        setJogador(jogador * -1);
        const novoVencedor = PegarVencedor(newValues);

        if(novoVencedor){
            setVencedor(novoVencedor > 0 ? 1 : -1);
        }
    }
    function reset(){
        setVencedor(null);
        setValues(pegarEstadoInicial);
        setJogador(1);
    };

    const Empate = Object.values(values).filter(Boolean).length === 9 && !vencedor;

    return (
    <div className="Game">
        <div className="Game__board">
            {Array.from({length:9}).map((_,index) => {
                const key = pegarChaveDaIndex(index);
                return (
                    <button key={index} type="button" onClick={() =>{handleClick(key)}}>
                        
                        {getLabel(values[key])}
                        </button>
                )
            })}
        </div>
        {(vencedor || Empate) && (
             <div className="Game__menu">
                 {vencedor ? (
                     <p>O ganhador é: {vencedor > 0 ? 'O' : 'X'}</p>
                 ): (
                     <p>Empate!!!</p>
                 )}
                
                <button className="reiniciar" onClick={reset}>Reiniciar</button>
        </div> 
        )}
      
    </div>
    );
}

export default Game;