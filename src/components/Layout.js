import React from 'react'
import { Drawer, List, ListItemText, ListItem, ListItemIcon, makeStyles, Typography, AppBar, Toolbar } from "@material-ui/core";
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";
import Avatar from "@material-ui/core/Avatar";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3)
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display:"flex"
    },
    active: {
        background: '#f4f4f4'
    },
    title: {
        padding: theme.spacing(2)
    },
    appbar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    date: {
        flexGrow: 1
    },
    avatar: {
        marginLeft: theme.spacing(2)
    }
}})

export default function Layout({children}) {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create'
        }
    ]

    return (
        <div className={classes.root} >
            <AppBar
             position="fixed"
             className={classes.appbar}
             elevation={0}
             color="primary"
            >
                <Toolbar>
                    <Typography className={classes.date} >
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Jorge
                    </Typography>
                    <Avatar src="./avatar.png" className={classes.avatar} />
                </Toolbar>
            </AppBar>

            <Drawer
             className={classes.drawer}
             variant="permanent"
             anchor="left"
             classes={{paper: classes.drawerPaper}}
            >
            <div>
                <Typography variant="h5" className={classes.title} >
                    Ninja Notes
                </Typography>
            </div>

            <List>
                {menuItems.map(item => (
                    <ListItem
                     button
                     key={item.text}
                     onClick={()=> history.push(item.path)}
                     className={location.pathname == item.path ? classes.active : null}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            </Drawer>

            <div className={classes.page} >
                <div className={classes.toolbar} ></div>
                {children}
            </div>
        </div>
    )
}
