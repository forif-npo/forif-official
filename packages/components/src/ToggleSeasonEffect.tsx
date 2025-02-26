import AcUnitIcon from '@mui/icons-material/AcUnit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ToggleSeasonEffectProps {
  show: boolean;
  toggleSeasonEffect: () => void;
}

function ToggleSeasonEffect({
  show,
  toggleSeasonEffect,
}: ToggleSeasonEffectProps) {
  return (
    <Box sx={{ maxWidth: '32px' }}>
      <Button
        variant='text'
        onClick={toggleSeasonEffect}
        size='small'
        aria-label='button to toggle season effect'
        sx={{ minWidth: '32px', height: '32px', p: '4px' }}
      >
        {show ? (
          <AcUnitIcon fontSize='small' />
        ) : (
          <AcUnitIcon fontSize='small' color='disabled' />
        )}
      </Button>
    </Box>
  );
}

export default ToggleSeasonEffect;
