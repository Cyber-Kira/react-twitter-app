import React from 'react';

import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import PostStatusFilter from '../post-status-filter/';
import PostList from '../post-list/';
import PostAddForm from '../post-add-form/';

import './app.css';

export default class App extends React.Component {
    maxId = 4;
    state = {
        data: [
            { label: "Going to learn React", important: true, liked: false, id: 1 },
            { label: "That is so good", important: false, liked: false, id: 2 },
            { label: "I need a break...", important: false, liked: false, id: 3 },
        ]
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [ ...before, ...after ];

            return {
                data: newArr
            }
        });
    }

    addItem = (body) => {
        const newItem = {
            label: body,
            inportant: false,
            id: this.maxId += 1
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const oldItem = data[index];
            const newItem = { ...oldItem, important: !oldItem.important };

            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [ ...before, newItem,  ...after ];

            return {
                data: newArr
            }
        })
    }

    onToggleLiked = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const oldItem = data[index];
            const newItem = { ...oldItem, liked: !oldItem.liked };

            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [ ...before, newItem,  ...after ];

            return {
                data: newArr
            }
        })
    }

    render() {
        const {data} = this.state;
        const liked = data.filter(item => item.liked).length;
        const allPosts = data.length;

        return (
            <div className="app">
                <AppHeader 
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel />
                    <PostStatusFilter />
                </div>
                <PostList 
                    posts = { this.state.data }
                    onDelete={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleLiked={ this.onToggleLiked } />
                <PostAddForm
                    onAdd={ this.addItem } />
            </div>
        );
    }
};