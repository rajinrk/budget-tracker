// src/components/AddCategoryDialog.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { SketchPicker } from 'react-color';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; color: string }) => void;
  onUpdate?: (data: { _id: string; name: string; color: string }) => void;
  editingCategory?: { _id: string; name: string; color: string } | null;
}

export const AddCategoryDialog: React.FC<Props> = ({ 
  open, 
  onClose, 
  onAdd, 
  onUpdate,
  editingCategory 
}) => {
  const [formData, setFormData] = useState({ name: '', color: '#000000' });
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        color: editingCategory.color
      });
    } else {
      setFormData({ name: '', color: '#000000' });
    }
  }, [editingCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: any) => {
    setFormData(prev => ({ ...prev, color: color.hex }));
  };

  const handleSubmit = () => {
    if (!formData.name) return;
    
    if (editingCategory && onUpdate) {
      onUpdate({
        _id: editingCategory._id,
        ...formData
      });
    } else {
      onAdd(formData);
    }
    
    onClose();
    setFormData({ name: '', color: '#000000' });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setShowColorPicker(!showColorPicker)}
            sx={{
              backgroundColor: formData.color,
              color: '#fff',
              '&:hover': {
                backgroundColor: formData.color,
                opacity: 0.9
              }
            }}
          >
            {showColorPicker ? 'Close Color Picker' : 'Pick Color'}
          </Button>
          {showColorPicker && (
            <Box sx={{ position: 'absolute', zIndex: 2, mt: 1 }}>
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
                onClick={() => setShowColorPicker(false)}
              />
              <SketchPicker
                color={formData.color}
                onChange={handleColorChange}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {editingCategory ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


