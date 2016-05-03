<?php
$count = 3;
$morehref = $count < 3 ? 'tmp/comment.tmp.php#more' . $count : '';
?>
<section class="comments-container">
    <nav class="comments-tab">
        <a class="ordinary item on">用户评论</a>
        <!-- <a class="sort-date item">优评热评</a> -->
    </nav>
	<ul class="comments-wrapper">
		<li class="comment">
            <div class="metas">
                <i class="ibhp-person"></i><span class="name">username02</span>
                <i class="ibhp-insert_invitation"></i><span class="date">2016-03-17</span>
            </div>
            <p class="comment-body">Lorem ipsum dolor sit amet, consectetur</p>
		</li>
		<li class="comment">
            <div class="metas">
                <i class="ibhp-person"></i><span class="name">username02</span>
                <i class="ibhp-insert_invitation"></i><span class="date">2016-03-17</span>
            </div>
            <p class="comment-body">Lorem ipsum dolor sit amet, consectetur</p>
		</li>
		<li class="comment">
            <div class="metas">
                <i class="ibhp-person"></i><span class="name">username02</span>
                <i class="ibhp-insert_invitation"></i><span class="date">2016-03-17</span>
            </div>
            <p class="comment-body">Lorem ipsum dolor sit amet, consectetur</p>
		</li>
		<li class="comment">
            <div class="metas">
                <i class="ibhp-person"></i><span class="name">username02</span>
                <i class="ibhp-insert_invitation"></i><span class="date">2016-03-17</span>
            </div>
            <p class="comment-body">Lorem ipsum dolor sit amet, consectetur</p>
		</li>
		<li class="comment">
            <div class="metas">
                <i class="ibhp-person"></i><span class="name">username02</span>
                <i class="ibhp-insert_invitation"></i><span class="date">2016-03-17</span>
            </div>
            <p class="comment-body">Lorem ipsum dolor sit amet, consectetur</p>
		</li>
		<li class="comment">
            <div class="metas">
                <i class="ibhp-person"></i><span class="name">username02</span>
                <i class="ibhp-insert_invitation"></i><span class="date">2016-03-17</span>
            </div>
            <p class="comment-body">Lorem ipsum dolor sit amet, consectetur</p>
		</li>
	</ul>
    <div class="loader" data-require="<?php echo $morehref; ?>">查看更多</div>
    <div class="submit-comment-wrapper">
        <form action="" class="submit-comment">
            <textarea name="commentContent"  class="commentContent" cols="0" rows="0" hidden></textarea>
            <div class="textarea" contenteditable></div>
            <input type="submit" value="发布" class="submit">
        </form>
    </div>
</section>
<?php $count++; ?>
