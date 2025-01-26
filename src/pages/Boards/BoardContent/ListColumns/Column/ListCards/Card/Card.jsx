import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Card as MuiCard } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// eslint-disable-next-line react/prop-types
function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Card Test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://th.bing.com/th/id/R.e6ac556d4ff7969dda32a82307fb372f?rik=Z6Q79yn3%2bo3OBA&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f2%2f25%2fBangkok_Reptiles_Blue_crested_Lizard.jpg&ehk=OjGCdLaNX8IsxLidsQ0JYE5oDfXMb4Lbd1L6rtt3Ahc%3d&risl=&pid=ImgRaw&r=0"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Levion</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>20</Button>
        <Button size="small" startIcon={<CommentIcon />}>15</Button>
        <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card