import { useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import { IconButton, ListItemText, Tooltip, Typography } from '@mui/material'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAPI, selectCurrentUser } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined'


function Profiles() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const confirmLogout = useConfirm()
  const handleLogout = () => {
    confirmLogout({
      title: 'Log out of your account?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then(() => {
      dispatch(logoutUserAPI())
    }).catch(() => {})
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 25, height: 25 }}
            src={currentUser?.avatar}
            alt={currentUser?.displayName}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
        sx={{ '.MuiPaper-root': { borderRadius: '10px', top: '58px !important' } }}
      >
        <MenuItem sx={{ pointerEvents: 'none', my: 1 }}>
          <ListItemText sx={{
            color: (theme) => theme.palette.text.main,
            textTransform: 'uppercase',
            '& .MuiTypography-root': { fontWeight: '500' }
          }}>
            Profile
          </ListItemText>
        </MenuItem>

        <MenuItem
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            pointerEvents: 'none'
          }}
        >
          <Avatar
            sx={{ width: '28px', height: '28px' }}
            src={currentUser?.avatar}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ color: (theme) => theme.palette.text.main, fontWeight: '500', fontSize: '1.05rem' }}>{currentUser.displayName}</Typography>
            <Typography sx={{ color: (theme) => theme.palette.text.main }}>{currentUser.email}</Typography>
          </Box>
        </MenuItem>

        <MenuItem>
          <ListItemText>Add another account</ListItemText>
          <ListItemIcon>
            <PersonAddAltOutlinedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        <MenuItem>
          <ListItemText>Manage Profile</ListItemText>
          <ListItemIcon>
            <ManageAccountsOutlinedIcon fontSize='small'/>
          </ListItemIcon>
        </MenuItem>

        <Divider />

        <MenuItem sx={{ pointerEvents: 'none' }}>
          <ListItemText sx={{
            color: (theme) => theme.palette.text.main,
            textTransform: 'uppercase',
            '& .MuiTypography-root': { fontWeight: '500' }
          }}>
            Trello
          </ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemText>Theme</ListItemText>
          <ListItemIcon>
            <ContrastOutlinedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        <MenuItem>
          <ListItemText>Settings</ListItemText>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{
          '&:hover': {
            color: 'warning.dark',
            '& .logout-icon': { color: 'warning.dark' }
          }
        }}>
          <ListItemText>Logout</ListItemText>
          <ListItemIcon>
            <Logout className='logout-icon' fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles
