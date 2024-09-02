import React, { useState, useEffect, useRef } from 'react';
import './TagsInput.css';

const TagsInput = ({ suggestions, tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  // Filter suggestions based on inputValue
  const filteredSuggestions = inputValue === '' ? suggestions : suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  );

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Check if the click is outside the container
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    const handleGlobalKeyDown = (e) => {
      if (textareaRef.current === document.activeElement) {
        if (e.key === ' ' && e.ctrlKey) {
          e.preventDefault(); // Prevent default behavior of Space key
          setShowSuggestions((prev) => !prev); // Toggle suggestions
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setHighlightedIndex((prevIndex) => 
            Math.min(prevIndex + 1, filteredSuggestions.length - 1)
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHighlightedIndex((prevIndex) => 
            Math.max(prevIndex - 1, 0)
          );
        } else if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          if (highlightedIndex >= 0) {
            handleAddTag(filteredSuggestions[highlightedIndex]);
          }
        }
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [highlightedIndex, filteredSuggestions]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setHighlightedIndex(-1); // Reset highlighted index when typing
    setShowSuggestions(true); // Show suggestions when user types
  };

  const handleAddTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setInputValue('');
      setShowSuggestions(false); // Hide suggestions after adding a tag
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  return (
    <div ref={containerRef} className="tags-input-container">
      <div className="tags-area">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <span className="tag-close-icon" onClick={() => handleDeleteTag(tag)}>x</span>
          </div>
        ))}
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search and add..."
          className="textarea-box"
        />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion ${index === highlightedIndex ? 'highlighted' : ''}`}
              onClick={() => handleAddTag(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsInput;
