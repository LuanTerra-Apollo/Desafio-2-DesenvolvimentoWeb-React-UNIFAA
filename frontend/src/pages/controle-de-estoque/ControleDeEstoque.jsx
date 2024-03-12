import React from 'react';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CardControleDeEstoque } from '../../shared/components/card-controle-de-estoque/CardControleDeEstoque';

export const ControleDeEstoque = () => {
    return (
        <LayoutBaseDePagina>
            <CardControleDeEstoque/>
        </LayoutBaseDePagina>
    )
}