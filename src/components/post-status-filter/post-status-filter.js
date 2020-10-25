import React from 'react';

import './post-status-filter.css';

export default class PostStatusFilter extends React.Component {
    buttons = [
        {name: 'all', label: 'Все'},
        {name: 'liked', label: 'Понравилось'}
    ]

    render() {
        const {filter, onFilterSelect} = this.props;
        const buttons = this.buttons.map(({name, label}) => {
            const active = filter === name;
            const clazz = active ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button 
                    key={name} 
                    type="button" 
                    className={`btn ${clazz}`}
                    onClick={() => onFilterSelect(name)}>{label}</button>
            )
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
};