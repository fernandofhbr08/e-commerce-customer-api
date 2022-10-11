const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get("/special-customer/:customer", async (req, res) => {

    try {
        const customer_id = req.params.customer;
    
        console.log(customer_id, process.env.TOKEN, process.env.USER);
        if( !customer_id ){
            return res.json({error: true, msg: 'ID do cliente não informado.'});
        }
        
        var config = {
            method: 'get',
            url: `https://api.nuvemshop.com.br/v1/${process.env.USER}/customers/${customer_id}?fields=note`,
            headers: { 
                'Authentication': `bearer ${process.env.TOKEN}`
            }
        };
    
        const result = await axios(config);
            
        console.log(result);
        if( !result || typeof result !== 'object' ){
            return res.json({error: true, msg: 'Erro ao consultar cliente.'});
        }

        if( 'note' in result  ){
            const { note } = result;
            if( !note || note.trim() === '' ){
                return res.json({success: true, msg: 'Cliente normal', is_special: false});
            }else if( note.indexOf('CLIENTE_VIP') >= 0 ){
                return res.json({success: true, msg: 'Cliente especial', is_special: true});
            }
        }
    
        return res.json({error: true, msg: 'Nenhum resultado encontrado.'});
    } catch (error) {
        return res.json({error: true, msg: `Erro ao consultar cliente: ${error}` });
    }
});

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
})