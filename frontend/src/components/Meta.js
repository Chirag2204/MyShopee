import React from 'react'
import { Helmet } from 'react-helmet'

export const Meta = ({title,description,keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'MyShopee',
    description: 'We Deliver Happiness..!',
    keywords : 'Get Exciting Deals On Electronics'
}
