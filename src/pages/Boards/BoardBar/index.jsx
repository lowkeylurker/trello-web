import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import avatar from '~/assets/avatar.jpg'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  color: 'primary.main',
  backgroundColor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      px: 2,
      overflowX: 'auto',
      borderTop: '1px solid #00bfa5'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          icon={<DashboardIcon />}
          label="Levion"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          clickable
          sx={MENU_STYLES}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          sx={MENU_STYLES}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}>Invite</Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              fontSize: 16
            }
          }}
        >
          <Tooltip title='Levion'>
            <Avatar alt="Levion" src={avatar} />
          </Tooltip>
          <Tooltip title='Levion'>
            <Avatar alt="Levion" src={avatar} />
          </Tooltip>
          <Tooltip title='Levion'>
            <Avatar alt="Levion" src={avatar} />
          </Tooltip>
          <Tooltip title='Levion'>
            <Avatar alt="Levion" src={avatar} />
          </Tooltip>
          <Tooltip title='Levion'>
            <Avatar alt="Levion" src={avatar} />
          </Tooltip>
          <Tooltip title='Levion'>
            <Avatar alt="Levion" src={avatar} />
          </Tooltip>
          <Tooltip title='Levion'>
            <Avatar alt="Levion" src={avatar} />
          </Tooltip>
          <Tooltip title='Levion'>
            <Avatar alt="Levion" src={avatar} />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
