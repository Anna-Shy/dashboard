import React, { useState } from 'react'

import { Box, List, ListItem, Divider, Button, Drawer } from '@mui/material'

type Anchor = "right";

export const MenuBtnDrawer = ({ title }: { title: string }) => {
    const [state, setState] = useState({
        right: false
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: 450 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem>1</ListItem>
                <ListItem>2</ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>1</ListItem>
                <ListItem>2</ListItem>
            </List>
        </Box>
    );

    return (
        <>
            {(["right"] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button
                        disabled={false}
                        size="medium"
                        variant="outlined"
                        className='menu-btn'
                        onClick={toggleDrawer(anchor, true)}
                    >
                        {title}
                    </Button>

                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </>
    )
}
