class Solution(object):
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        occurance = set()
        right = -1
        curr = 1
        max_length = 0
        n = len(s)
        for left in range(n):
            curr = curr - 1
            if left - 1 >= 0 and s[left - 1] in occurance:
                occurance.remove(s[left - 1])
            while (right + 1 < n and s[right + 1] not in occurance):
                curr = curr + 1
                occurance.add(s[right + 1])
                right = right + 1
            max_length = max(max_length, right - left + 1)

        return max_length

# Sliding window, from left to right, expand the window by move the right pointer and move the left pointer
