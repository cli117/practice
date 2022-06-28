class Solution(object):
    def twoSum(self, nums, target):
        table = dict()
        for i, num in enumerate(nums):
            if target - num in table:
                return [i, table[target - num]]
            table[num] = i
        return []

# Python grammar:
# 1. dict is a hashtable,
# 2. for i, num in enumerate(nums)

# hashtable find takes O(1) since keys are hashed

