import React from 'react';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CardLogin } from '../../shared/components/card-login/CardLogin';

export const Login = () => {
    return (
        <LayoutBaseDePagina login>
            <CardLogin/>
        </LayoutBaseDePagina>
    )
}